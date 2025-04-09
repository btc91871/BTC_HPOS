import { ExtensionOperationRequestType, ExtensionOperationRequestHandlerBase } from "PosApi/Create/Operations";
import SectionOperationResponse from "../Section/SectionOperationResponse";
import SectionOperationRequest from "../Section/SectionOperationRequest";
import { ClientEntities } from "PosApi/Entities";
export default class SectionOperationRequestHandler<TResponse extends SectionOperationResponse> extends ExtensionOperationRequestHandlerBase<TResponse> {

    public supportedRequestType(): ExtensionOperationRequestType<TResponse> {
        return SectionOperationRequest;
    }
    public executeAsync(request: SectionOperationRequest<TResponse>): Promise<ClientEntities.ICancelableDataResult<TResponse>> {

      
        this.context.navigator.navigate("SectionListView");
        return Promise.resolve(<ClientEntities.ICancelableDataResult<TResponse>>{
            canceled: true,
            data: new SectionOperationResponse()
        });

    }
}
