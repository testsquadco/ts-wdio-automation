import type BrowserStackConfig from '../config.js';
import type { BrowserstackHealing } from '@browserstack/ai-sdk-node';
export declare function sendStart(config: BrowserStackConfig): Promise<void>;
export declare function sendFinish(config: BrowserStackConfig): Promise<void>;
export declare function saveFunnelData(eventType: string, config: BrowserStackConfig): string;
export declare function fireFunnelRequest(data: any): Promise<void>;
export declare function handleHealingInstrumentation(authResult: BrowserstackHealing.InitErrorResponse | BrowserstackHealing.InitSuccessResponse, config: BrowserStackConfig, isSelfHealEnabled: boolean | undefined): void;
//# sourceMappingURL=funnelInstrumentation.d.ts.map