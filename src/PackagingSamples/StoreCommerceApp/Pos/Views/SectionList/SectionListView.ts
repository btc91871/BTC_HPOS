import * as Views from "PosApi/Create/Views";
import { ObjectExtensions } from "PosApi/TypeExtensions";
import ko from "knockout";
import { SectionModel, TableModel } from "../../DataService/DataServiceRequests.g";
import { GetCurrentProductCatalogStoreClientRequest, GetProductsByIdsClientRequest } from "PosApi/Consume/Products";
import { GetScanResultClientRequest } from "PosApi/Consume/ScanResults";
import { ClientEntities } from "PosApi/Entities";
import { AddItemToCartOperationRequest } from "PosApi/Consume/Cart";
export default class SectionListView extends Views.CustomViewControllerBase {
    public sectionButtons: ko.ObservableArray<string>;
    public currentSection: ko.Observable<string>;
    public tableData: ko.ObservableArray<any>;
    public sectionsPerPage: number = 5;
    public allSections: ko.ObservableArray<{ id: string, name: string }>;
    public currentFrame: ko.Observable<number>;
    public tableName: ko.Observable<string>;
    public Capacity: ko.Observable<Number>;
    public TablesInSection: ko.Observable<Number>;
    public ChairCount: ko.Observable<Number>;

    public dispose(): void {
        ObjectExtensions.disposeAllProperties(this);
    }

    constructor(context: Views.ICustomViewControllerContext, itemID: string) {

        let config: Views.ICustomViewControllerConfiguration = {
            title: "Restaurant Sections",
            commandBar: {
                commands: [
                    {
                        name: "AppBarView_appBarCommand",
                        label: "Save",
                        icon: Views.Icons.Edit,
                        isVisible: true,
                        canExecute: true,
                        execute: async (args: Views.CustomViewControllerExecuteCommandArgs): Promise<void> => {
                            await this.appBarCommandExecute(itemID);
                        }
                    }
                ]
            }
        };
        super(context, config);

        // Initialize observables
        this.sectionButtons = ko.observableArray([]);
        this.tableName = ko.observableArray("");
        this.Capacity = ko.observableArray(0);
        this.ChairCount = ko.observableArray(0);
        this.TablesInSection = ko.observableArray(0);
        this.currentSection = ko.observable(null);
        this.tableData = ko.observableArray([]);
        this.currentFrame = ko.observable(1);
        this.allSections = ko.observableArray([]);
        this.onSectionClick = this.onSectionClick.bind(this);
        this.loadSections();
    }




    private async appBarCommandExecute(itemId: string): Promise<void> {
        if (itemId != "") {
            var productSaleDetails: ClientEntities.IProductSaleReturnDetails[] = [];
            var catelog = await this.context.runtime.executeAsync(new GetCurrentProductCatalogStoreClientRequest());
            var scanresult = await this.context.runtime.executeAsync(new GetScanResultClientRequest(itemId));
            var productid = scanresult.data.result.Product.RecordId;
            var products = await this.context.runtime.executeAsync(new GetProductsByIdsClientRequest([productid], this.context.logger.getNewCorrelationId()))

            let productSale: ClientEntities.IProductSaleReturnDetails = {
                product: products.data.result[0],
                quantity: 1,
                catalogId: catelog.data.context.CatalogId,
                extensionProperties: []
            }
            productSaleDetails.push(productSale);
            await this.context.runtime.executeAsync(new AddItemToCartOperationRequest(productSaleDetails, this.context.logger.getNewCorrelationId()))
        }
        this.context.navigator.navigateToPOSView("CartView",);
        console.log("Save clicked");
    }

    public onReady(element: HTMLElement): void {
        ko.applyBindings(this, element);
    }

    public async onSectionClick(section: { id: string; name: string }): Promise<void> {
        this.currentSection(section.name);
        await this.loadTableData(section.id);
    }

    private async loadSections(): Promise<void> {
        try {
            const result = await this.context.runtime.executeAsync(new SectionModel.getSectionFieldsRequest());
            const res = result.data.result;

            if (res && res.length > 0) {
                const uniqueSections = res
                    .map((item: any) => {
                        const idProp = item.ExtensionProperties?.find((prop: any) => prop.Key === "SECTIONID");
                        const nameProp = item.ExtensionProperties?.find((prop: any) => prop.Key === "NAME");

                        return idProp && nameProp
                            ? { id: idProp.Value.StringValue, name: nameProp.Value.StringValue }
                            : null;
                    })
                    .filter((value) => value !== null) as { id: string, name: string }[];

                console.log("uniqueSections content: ", uniqueSections);
                this.allSections(uniqueSections);
                this.sectionButtons(uniqueSections);
                this.updateFrame(1);
                console.log("sectionButtons content: ", this.sectionButtons());
            }
        } catch (error) {
            console.error("Error loading sections: ", error);
        }
    }

    public async loadTableData(sectionId: string): Promise<void> {
        try {
            const result = await this.context.runtime.executeAsync(new TableModel.getTableFieldsRequest());
            const res = result.data.result || [];

            console.log("res-------------------", res);
            console.log("Filtering for SectionID: ", sectionId);

            // Filter data based on the selected section ID
            let data = res.filter((item: any) => {
                let sectionIdProp = item.ExtensionProperties?.find((prop: any) => prop.Key === "SECTIONID");
                return sectionIdProp && sectionIdProp.Value.StringValue === sectionId;
            });

            if (!data.length) {
                this.tableData([]);
                return;
            }

            const transformedData = data.map((item: any) => {
                const chairCountProp = item.ExtensionProperties?.find((prop: any) => prop.Key === "CHAIRCOUNT");
                const tableCountProp = item.ExtensionProperties?.find((prop: any) => prop.Key === "TABLESINSECTION");
                this.ChairCount(chairCountProp?.Value.IntegerValue || 0);
                this.TablesInSection(tableCountProp?.Value.IntegerValue || 0);


                return {
                    TableName: item.TableName || "",
                    Capacity: item.Capacity || 0,
                    ChairCount: chairCountProp?.Value.IntegerValue || 0,
                    TablesInSection: tableCountProp?.Value.IntegerValue || 0
                };
            });

            this.tableData(transformedData);

            console.log("Transformed table data: ", this.tableData());
        } catch (error) {
            console.error("Error loading table data: ", error);
        }
    }

    private updateFrame(frame: number): void {
        const startIdx = (frame - 1) * this.sectionsPerPage;
        const endIdx = startIdx + this.sectionsPerPage;
        this.sectionButtons(this.allSections().slice(startIdx, endIdx));
        this.currentFrame(frame);

    }

    public nextFrame(): void {
        if (this.currentFrame() * this.sectionsPerPage < this.allSections().length) {
            this.updateFrame(this.currentFrame() + 1);
        }
    }

    public prevFrame(): void {
        if (this.currentFrame() > 1) {
            this.updateFrame(this.currentFrame() - 1);
        }
    }

}
