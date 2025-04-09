import SectionOperationResponse from "../Section/SectionOperationResponse";
import SectionOperationRequest from "../Section/SectionOperationRequest";
import { ExtensionOperationRequestFactoryFunctionType, IOperationContext } from "PosApi/Create/Operations";
import { ClientEntities } from "PosApi/Entities";
//import { ObjectExtensions } from "PosApi/TypeExtensions";

let getOperationRequest: ExtensionOperationRequestFactoryFunctionType<SectionOperationResponse> =

    function (
        context: IOperationContext,
        operationId: number,
        actionParameters: string[],
        correlationId: string
    ): Promise<ClientEntities.ICancelableDataResult<SectionOperationRequest<SectionOperationResponse>>> {

        let operationRequest: SectionOperationRequest<SectionOperationResponse> =
            new SectionOperationRequest<SectionOperationResponse>(correlationId);

        return Promise.resolve(<ClientEntities.ICancelableDataResult<SectionOperationRequest<SectionOperationResponse>>>{
            canceled: false,
            data: operationRequest
        });

    };

export default getOperationRequest;