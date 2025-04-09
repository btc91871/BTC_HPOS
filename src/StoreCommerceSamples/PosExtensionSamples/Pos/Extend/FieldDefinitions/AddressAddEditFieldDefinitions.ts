/**
 * SAMPLE CODE NOTICE
 *
 * THIS SAMPLE CODE IS MADE AVAILABLE AS IS.  MICROSOFT MAKES NO WARRANTIES, WHETHER EXPRESS OR IMPLIED,
 * OF FITNESS FOR A PARTICULAR PURPOSE, OF ACCURACY OR COMPLETENESS OF RESPONSES, OF RESULTS, OR CONDITIONS OF MERCHANTABILITY.
 * THE ENTIRE RISK OF THE USE OR THE RESULTS FROM THE USE OF THIS SAMPLE CODE REMAINS WITH THE USER.
 * NO TECHNICAL SUPPORT IS PROVIDED.  YOU MAY NOT DISTRIBUTE THIS CODE UNLESS YOU HAVE A LICENSE AGREEMENT WITH MICROSOFT THAT ALLOWS YOU TO DO SO.
 */

import { IAddressAddEditExtensionDefinition } from "PosApi/Extend/FieldDefinitions/FieldDefinitions";
import { ClientEntities } from "PosApi/Entities";

export default (): IAddressAddEditExtensionDefinition[] => {
    return [
        {
            field: ClientEntities.AddressFieldDefinitionType.Zip,
            enabled: true,
            required: true,
            visible: true,
            type: ClientEntities.HtmlInputFieldType.Number,
            pattern: new RegExp("[1-9]\d+"),
            maxLength: 20
        },
        {
            field: ClientEntities.AddressFieldDefinitionType.StreetName,
            enabled: false,
            required: true,
            visible: true,
            type: ClientEntities.HtmlInputFieldType.Text,
            pattern: new RegExp("[A-Z]\w+"),
            maxLength: 20
        }
    ];
};