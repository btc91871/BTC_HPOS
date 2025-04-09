/**
 * SAMPLE CODE NOTICE
 *
 * THIS SAMPLE CODE IS MADE AVAILABLE AS IS.  MICROSOFT MAKES NO WARRANTIES, WHETHER EXPRESS OR IMPLIED,
 * OF FITNESS FOR A PARTICULAR PURPOSE, OF ACCURACY OR COMPLETENESS OF RESPONSES, OF RESULTS, OR CONDITIONS OF MERCHANTABILITY.
 * THE ENTIRE RISK OF THE USE OR THE RESULTS FROM THE USE OF THIS SAMPLE CODE REMAINS WITH THE USER.
 * NO TECHNICAL SUPPORT IS PROVIDED.  YOU MAY NOT DISTRIBUTE THIS CODE UNLESS YOU HAVE A LICENSE AGREEMENT WITH MICROSOFT THAT ALLOWS YOU TO DO SO.
 */

import { ISearchFilterDefinitionContext, CustomTextSearchFilterDefinitionBase } from "PosApi/Extend/Views/CustomSearchFilters";

/**
 * Represents a sample text search filter.
 */
export default class SampleOrderSearchTextFilter extends CustomTextSearchFilterDefinitionBase {
    protected readonly labelValue: string;
    protected readonly id: string;

    /**
     * Creates a new instance of the SampleOrderSearchTextFilter class.
     * @param {ISearchFilterDefinitionContext} context The search filter definition context.
     */
    constructor(context: ISearchFilterDefinitionContext) {
        super(context);

        this.id = "SampleOrderSearchTextFilter";
        this.labelValue = "Sample Order Search Filter";
    }
}