/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { Message } from "wow-mum-look-no-hands";
export namespace Components {
    interface WowMumComponent {
        "loadMessagesFromString": (json: string) => Promise<void>;
        "loadMessagesFromUrl": (url: string) => Promise<void>;
        "messageData": string;
        "messageDataUrl": string;
        "setMessages": (messages: Message[]) => Promise<void>;
        "showtime": () => Promise<void>;
        "visibleLimit": number;
    }
}
declare global {
    interface HTMLWowMumComponentElement extends Components.WowMumComponent, HTMLStencilElement {
    }
    var HTMLWowMumComponentElement: {
        prototype: HTMLWowMumComponentElement;
        new (): HTMLWowMumComponentElement;
    };
    interface HTMLElementTagNameMap {
        "wow-mum-component": HTMLWowMumComponentElement;
    }
}
declare namespace LocalJSX {
    interface WowMumComponent {
        "messageData"?: string;
        "messageDataUrl"?: string;
        "visibleLimit"?: number;
    }
    interface IntrinsicElements {
        "wow-mum-component": WowMumComponent;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "wow-mum-component": LocalJSX.WowMumComponent & JSXBase.HTMLAttributes<HTMLWowMumComponentElement>;
        }
    }
}
