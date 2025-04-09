import { ExtensionOperationRequestBase } from "PosApi/Create/Operations";
import SectionOperationResponse from "../Section/SectionOperationResponse";

export default class asongoldrateOperationRequest<TResponse extends SectionOperationResponse> extends ExtensionOperationRequestBase<TResponse> {

    constructor(correlationId: string) {
        super(6001, correlationId);
    }
}