/**
 * Validation class
 */
export default class Validation {
    success: boolean;
    message: string;

    /**
     * 
     * @param success If the validation was successul
     * @param message The validation message, if the validation failed
     */
    constructor(success: boolean = true,  message: string = "") {
        this.success = success;
        this.message = message;
        
    }
    
}