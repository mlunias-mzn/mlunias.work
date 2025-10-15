import { useEffect, useState } from "react";
import { useSpring, useMotionValueEvent } from "framer-motion";

export type Expression = "neutral" | "sad" | "smile";

export interface FaceProps {
    expression: Expression;
    size?: number;
    strokeWidth?: number;
    animate?: boolean;
    outline?: boolean;
    intensity?: number;
    className?: string;
}

function qPath(x1: number, y1: number, cx: number, cy: number, x2: number, y2: number) {
    return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

interface ExpressionConfigProps {
    mouthCurv: number;
    eyeCurv: number;
    eyeInnerOffset: number;
    eyeOuterOffset: number;
    mouthWidthDelta: number;
    mouthOuterOffset: number
}

const ExpressionConfig: Record<Expression, ExpressionConfigProps> = {
    neutral: {
        mouthCurv: 0,
        eyeCurv: 0,
        eyeInnerOffset: 0,
        eyeOuterOffset: 0,
        mouthWidthDelta: 0,
        mouthOuterOffset: 0,
    },
    sad: {
        mouthCurv: 12,
        eyeCurv: 12,
        eyeInnerOffset: 0,
        eyeOuterOffset: 0,
        mouthWidthDelta: 2,
        mouthOuterOffset: 4,
    },
    smile: {
        mouthCurv: -20,
        eyeCurv: -16,
        eyeInnerOffset: 0,
        eyeOuterOffset: 0,
        mouthWidthDelta: 2,
        mouthOuterOffset: -4,
    }
}

function targetParams(expression: Expression, intensity?: number) {
    const e = ExpressionConfig[expression]
    const t = intensity ?? 1;

    const mouthCurv = e.mouthCurv * t;
    const eyeCurv = e.eyeCurv * t;

    const eyeInnerOffset = e.eyeInnerOffset * t;
    const eyeOuterOffset = e.eyeOuterOffset * t;

    const mouthWidthDelta = e.mouthWidthDelta * t;
    const mouthOuterOffset = e.mouthOuterOffset * t

    return { mouthCurv, eyeCurv, eyeInnerOffset, eyeOuterOffset, mouthWidthDelta, mouthOuterOffset };
}

export default function Face({
    expression = "neutral",
    size = 220,
    strokeWidth = 6,
    animate = true,
    outline = true,
    intensity = 1,
    className = "",
}: FaceProps) {
    // Spring-animated parameters. We animate a single scalar and re-derive the full target each time to ensure smoothness.
    // We'll animate each param with its own spring so their easing feels organic.
    const [p, setP] = useState(targetParams(expression, intensity));

    const cfg = { stiffness: 300, damping: 16, mass: 0.9 };
    const kMouth = useSpring(p.mouthCurv, cfg);
    const kEye = useSpring(p.eyeCurv, cfg);
    const kEyeI = useSpring(p.eyeInnerOffset, { stiffness: 170, damping: 20, mass: 0.7 });
    const kEyeO = useSpring(p.eyeOuterOffset, { stiffness: 1000, damping: 100, mass: 1 });
    const kMouthO = useSpring(p.mouthOuterOffset, { stiffness: 1000, damping: 100, mass: 1 });
    const kMouthW = useSpring(p.mouthWidthDelta, { stiffness: 150, damping: 18, mass: 0.9 });

    // Update springs on expression change
    useEffect(() => {
        const next = targetParams(expression, intensity);
        setP(next);
        if (animate) {
            kMouth.set(next.mouthCurv);
            kEye.set(next.eyeCurv);
            kEyeI.set(next.eyeInnerOffset);
            kEyeO.set(next.eyeOuterOffset);
            kMouthW.set(next.mouthWidthDelta);
            kMouthO.set(next.mouthOuterOffset);
        } else {
            // jump without animation
            kMouth.jump(next.mouthCurv);
            kEye.jump(next.eyeCurv);
            kEyeI.jump(next.eyeInnerOffset);
            kEyeO.jump(next.eyeOuterOffset);
            kMouthW.jump(next.mouthWidthDelta);
            kMouthO.jump(next.mouthOuterOffset);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [expression, intensity, animate]);

    // Local numeric states that mirror springs so we can compute an SVG path string on every change.
    const [mouthCurv, setMouthCurv] = useState(p.mouthCurv);
    const [eyeCurv, setEyeCurv] = useState(p.eyeCurv);
    const [eyeInnerOffset, setEyeInnerOffset] = useState(p.eyeInnerOffset);
    const [eyeOuterOffset, setEyeOuterOffset] = useState(p.eyeOuterOffset);
    const [mouthOuterOffset, setMouthOuterOffset] = useState(p.mouthOuterOffset);
    const [mouthWDelta, setMouthWDelta] = useState(p.mouthWidthDelta);

    useMotionValueEvent(kMouth, "change", (v) => setMouthCurv(v));
    useMotionValueEvent(kEye, "change", (v) => setEyeCurv(v));
    useMotionValueEvent(kEyeI, "change", (v) => setEyeInnerOffset(v));
    useMotionValueEvent(kEyeO, "change", (v) => setEyeOuterOffset(v));
    useMotionValueEvent(kMouthW, "change", (v) => setMouthWDelta(v));
    useMotionValueEvent(kMouthO, "change", (v) => setMouthOuterOffset(v));

    // Face geometry (viewBox 0..100)
    const vb = 100;
    const cx = 50;
    const cy = 52;
    const r = 42;

    // Eyes
    const eyeY = 40;
    const eyeHalf = 10; // half-width of eye curve
    const eyeGap = 16; // center gap between eyes
    // Left/right eye x centers
    const lx = cx - eyeGap;
    const rx = cx + eyeGap;

    // For smile look, move inner corners (toward center) vertically by innerEyeOffset
    const leftInner = { x: cx - (eyeGap - eyeHalf), y: eyeY };
    const rightInner = { x: cx + (eyeGap - eyeHalf), y: eyeY };

    const leftEyeStart = { x: lx - eyeHalf, y: eyeY + eyeOuterOffset };
    const leftEyeEnd = { x: leftInner.x, y: leftInner.y + eyeInnerOffset };
    const leftEyeCtrl = { x: lx, y: eyeY + eyeCurv };

    const rightEyeStart = { x: rightInner.x, y: rightInner.y + eyeInnerOffset };
    const rightEyeEnd = { x: rx + eyeHalf, y: eyeY + eyeOuterOffset };
    const rightEyeCtrl = { x: rx, y: eyeY + eyeCurv };

    const leftEyeD = qPath(leftEyeStart.x, leftEyeStart.y, leftEyeCtrl.x, leftEyeCtrl.y, leftEyeEnd.x, leftEyeEnd.y);
    const rightEyeD = qPath(rightEyeStart.x, rightEyeStart.y, rightEyeCtrl.x, rightEyeCtrl.y, rightEyeEnd.x, rightEyeEnd.y);

    // Mouth
    const mouthY = 64; // baseline y
    const mouthHalf = 18 + mouthWDelta; // adjustable width
    const mouthStart = { x: cx - mouthHalf, y: mouthY + mouthOuterOffset };
    const mouthEnd = { x: cx + mouthHalf, y: mouthY + mouthOuterOffset };
    const mouthCtrl = { x: cx, y: mouthY - mouthCurv };
    const mouthD = qPath(mouthStart.x, mouthStart.y, mouthCtrl.x, mouthCtrl.y, mouthEnd.x, mouthEnd.y);

    const stroke = "currentColor";

    return (
        <div className={`inline-flex flex-col items-center gap-4 ${className}`} style={{ width: size }}>
            <svg
                viewBox={`0 0 ${vb} ${vb}`}
                width={size}
                height={size}
                className="text-gray-800 drop-shadow-sm"
            >
                {/* Face outline */}
                {outline && <circle cx={cx} cy={cy} r={r} fill="none" stroke={stroke} strokeWidth={strokeWidth * 0.5} opacity={0.15} />}

                {/* Eyes */}
                <path d={leftEyeD} fill="none" stroke={stroke} strokeLinecap="round" strokeWidth={strokeWidth} />
                <path d={rightEyeD} fill="none" stroke={stroke} strokeLinecap="round" strokeWidth={strokeWidth} />

                {/* Mouth */}
                <path d={mouthD} fill="none" stroke={stroke} strokeLinecap="round" strokeWidth={strokeWidth} />
            </svg>
        </div>
    );
}