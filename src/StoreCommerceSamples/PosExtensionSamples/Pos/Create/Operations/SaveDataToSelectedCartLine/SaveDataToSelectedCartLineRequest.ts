/**
 * SAMPLE CODE NOTICE
 *
 * THIS SAMPLE CODE IS MADE AVAILABLE AS IS.  MICROSOFT MAKES NO WARRANTIES, WHETHER EXPRESS OR IMPLIED,
 * OF FITNESS FOR A PARTICULAR PURPOSE, OF ACCURACY OR COMPLETENESS OF RESPONSES, OF RESULTS, OR CONDITIONS OF MERCHANTABILITY.
 * THE ENTIRE RISK OF THE USE OR THE RESULTS FROM THE USE OF THIS SAMPLE CODE REMAINS WITH THE USER.
 * NO TECHNICAL SUPPORT IS PROVIDED.  YOU MAY NOT DISTRIBUTE THIS CODE UNLESS YOU HAVE A LICENSE AGREEMENT WITH MICROSOFT THAT ALLOWS YOU TO DO SO.
 */

import { ExtensionOperationRequestBase } from "PosApi/Create/Operations";
import SaveDataToSelectedCartLineResponse from "./SaveDataToSelectedCartLineResponse";

/**
 * (Sample) Operation request for saving data to selected cart line operation.
 */
export default class SaveDataToSelectedCartLineRequest<TResponse extends SaveDataToSelectedCartLineResponse> extends ExtensionOperationRequestBase<TResponse> {
    public readonly installationDate: string;

    constructor(correlationId: string, installationDate: string) {
        super(5003 /* operationId */, correlationId);

        this.installationDate = installationDate;
    }
}