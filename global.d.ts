// global.d.ts
interface Window {
    responsiveVoice: {
        speak: (text: string, voice?: string, options?: any) => void;
        cancel: () => void;
    };
}