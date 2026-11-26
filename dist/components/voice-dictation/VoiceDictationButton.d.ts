import * as React from "react";
type DictationControl = HTMLInputElement | HTMLTextAreaElement;
declare function isDictationInputType(type?: string): boolean;
declare function useVoiceDictation(enabled: boolean | undefined, disabled: boolean | undefined, controlRef: React.RefObject<DictationControl | null>): {
    isListening: boolean;
    isStopping: boolean;
    disabled: boolean;
    onClick: () => void;
} | null;
interface VoiceDictationButtonProps {
    isListening: boolean;
    isStopping: boolean;
    disabled: boolean;
    className?: string;
    onClick: () => void;
}
declare function VoiceDictationButton({ isListening, isStopping, disabled, className, onClick }: VoiceDictationButtonProps): React.JSX.Element;
export { isDictationInputType, useVoiceDictation, VoiceDictationButton };
//# sourceMappingURL=VoiceDictationButton.d.ts.map