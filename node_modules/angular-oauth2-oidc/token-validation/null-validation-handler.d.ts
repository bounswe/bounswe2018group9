import { ValidationHandler, ValidationParams } from './validation-handler';
/**
 * A validation handler that isn't validating nothing.
 * Can be used to skip validation (on your own risk).
 */
export declare class NullValidationHandler implements ValidationHandler {
    validateSignature(validationParams: ValidationParams): Promise<any>;
    validateAtHash(validationParams: ValidationParams): boolean;
}
