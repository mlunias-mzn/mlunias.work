export default function (props: { theme?: string }) {
    return (
        <div
            data-theme={props.theme}
            className="bg-base-100 group-hover:border-base-content/20 border-base-content/10 grid shrink-0 grid-cols-2 gap-0.5 rounded-md border p-1 transition-colors"
        >
            <div className="bg-base-content size-1 rounded-full"></div>
            <div className="bg-primary size-1 rounded-full"></div>
            <div className="bg-secondary size-1 rounded-full"></div>
            <div className="bg-accent size-1 rounded-full"></div>
        </div>
    )
}