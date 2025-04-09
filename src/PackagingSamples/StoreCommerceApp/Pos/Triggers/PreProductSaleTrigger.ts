import * as Triggers from "PosApi/Extend/Triggers/ProductTriggers";
import { ProxyEntities, ClientEntities } from "PosApi/Entities";
import MessageDialog from "../Dialog/MessageDialog";
import OrderDialog from "../Dialog/OrderDialog/OrderDialog";
import { IOrderDialogResult } from "../Dialog/OrderDialog/IOrderDialogResult";
import { TransactionType } from "../Entities/ITransactionType";
import * as CartOperations from "PosApi/Consume/Cart";


export default class PreProductSaleTrigger extends Triggers.PreProductSaleTrigger {

    public execute(options: Triggers.IPreProductSaleTriggerOptions): Promise<ClientEntities.ICancelable> {
        if (options.cart.CustomerId == "" || options.cart.CustomerId == null) {
            MessageDialog.show(this.context, "Please Add the Customer");
            return Promise.resolve({ canceled: true });
        } else {
            let dialog: OrderDialog = new OrderDialog();
            return dialog.open("Select Order Type").then((result: IOrderDialogResult) => {
                if (result.selectedValue === TransactionType.Dining) {

                    const itemId = options.cart.CartLines[options.cart.CartLines.length - 1].ItemId;
                    localStorage.setItem("SearchedItemID", itemId);
                    this.context.navigator.navigate("SectionListView", itemId)
                    console.log("User selected Dining transaction.");
                } else if (result.selectedValue === TransactionType.Takeaway) {
                    console.log("User selected Takeaway transaction.");
                    return Promise.resolve({ canceled: true });
                } else {
                    console.log("Unknown transaction type.");
                    return Promise.resolve({ canceled: true });
                }

                if (result.selectedValue) {
                    const TRANSACTIONTYPE: ProxyEntities.CommerceProperty = {
                        Key: "TRANSACTIONTYPE",
                        Value: <ProxyEntities.CommercePropertyValue>{
                            StringValue: result.selectedValue
                        }
                    };

                    this.context.runtime.executeAsync(new CartOperations.SaveExtensionPropertiesOnCartClientRequest([TRANSACTIONTYPE])).then(() => {
                        this.context.runtime.executeAsync<CartOperations.RefreshCartClientResponse>(new CartOperations.RefreshCartClientRequest(this.context.logger.getNewCorrelationId()))
                            .then((xx) => {
                            });
                    }).catch((reason: any) => {
                        this.context.logger.logError(JSON.stringify(reason));
                    });



                } else {
                    return Promise.reject();
                }

                return Promise.resolve({ canceled: true });
            }).catch((reason: any): Promise<ClientEntities.ICancelable> => {
                return Promise.resolve({ canceled: true });
            });
        }
    }
}
