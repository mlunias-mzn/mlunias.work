import ColorSchemeSelect from "../../modules/ColorScheme/ColorSchemeSelect";
import ThemeIcon from "../../modules/ColorScheme/ThemeIcon";
import { OptionContent, OptionContentCategory, OptionContentCotainer } from "./OptionContent";

export default function ContentGeneral(props: {

}) {
    return (
        <OptionContentCotainer>
            <OptionContentCategory header="表示">
                <OptionContent
                    label="テーマ"
                    description="UI全体の雰囲気を変更します。"
                >
                    <div className="flex flex-row gap-3">
                        <ThemeIcon />
                        <ColorSchemeSelect />
                    </div>
                </OptionContent>
            </OptionContentCategory>
        </OptionContentCotainer>
    )
}