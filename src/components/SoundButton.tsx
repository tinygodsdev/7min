import { MutedIcon, SoundIcon } from "./Icons";
import { useLocale } from "../i18n";

type SoundButtonProps = {
  enabled: boolean;
  onToggle: () => void;
  compact?: boolean;
};

export function SoundButton({ enabled, onToggle, compact = false }: SoundButtonProps) {
  const { copy } = useLocale();

  return (
    <button
      className={compact ? "icon-button" : "sound-button"}
      type="button"
      onClick={onToggle}
      aria-pressed={enabled}
      aria-label={enabled ? copy.soundDisable : copy.soundEnable}
    >
      {enabled ? <SoundIcon /> : <MutedIcon />}
      {!compact && <span>{enabled ? copy.soundOn : copy.soundOff}</span>}
    </button>
  );
}
