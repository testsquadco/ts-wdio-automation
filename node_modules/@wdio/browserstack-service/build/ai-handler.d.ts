import type { Capabilities } from '@wdio/types';
import type BrowserStackConfig from './config.js';
import type { Options } from '@wdio/types';
import type { BrowserstackHealing } from '@browserstack/ai-sdk-node';
import type { BrowserstackOptions } from './types.js';
declare class AiHandler {
    authResult: BrowserstackHealing.InitSuccessResponse | BrowserstackHealing.InitErrorResponse;
    wdioBstackVersion: string;
    constructor();
    authenticateUser(user: string, key: string): Promise<BrowserstackHealing.InitErrorResponse | BrowserstackHealing.InitSuccessResponse>;
    updateCaps(authResult: BrowserstackHealing.InitSuccessResponse | BrowserstackHealing.InitErrorResponse, options: BrowserstackOptions, caps: Array<Capabilities.RemoteCapability> | Capabilities.RemoteCapability): Capabilities.RemoteCapability | Capabilities.RemoteCapability[];
    setToken(sessionId: string, sessionToken: string): Promise<void>;
    installFirefoxExtension(browser: WebdriverIO.Browser): Promise<void>;
    handleHealing(orginalFunc: (arg0: string, arg1: string) => any, using: string, value: string, browser: WebdriverIO.Browser, options: BrowserstackOptions): Promise<any>;
    addMultiRemoteCaps(authResult: BrowserstackHealing.InitSuccessResponse | BrowserstackHealing.InitErrorResponse, config: Options.Testrunner, browserStackConfig: BrowserStackConfig, options: BrowserstackOptions, caps: any, browser: string): void;
    handleMultiRemoteSetup(authResult: BrowserstackHealing.InitSuccessResponse | BrowserstackHealing.InitErrorResponse, config: Options.Testrunner, browserStackConfig: BrowserStackConfig, options: BrowserstackOptions, caps: any): void;
    setup(config: Options.Testrunner, browserStackConfig: BrowserStackConfig, options: BrowserstackOptions, caps: any, isMultiremote: boolean): Promise<any>;
    handleSelfHeal(options: BrowserstackOptions, browser: WebdriverIO.Browser): Promise<void>;
    selfHeal(options: BrowserstackOptions, caps: Capabilities.RemoteCapability, browser: WebdriverIO.Browser): Promise<void>;
}
declare const _default: AiHandler;
export default _default;
//# sourceMappingURL=ai-handler.d.ts.map