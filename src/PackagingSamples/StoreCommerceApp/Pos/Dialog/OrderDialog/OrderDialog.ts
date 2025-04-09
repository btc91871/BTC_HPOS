
import * as Dialogs from "PosApi/Create/Dialogs";
import { ObjectExtensions } from "PosApi/TypeExtensions";
import { IOrderDialogResult } from "./IOrderDialogResult";
import ko from "knockout";
import { TransactionType } from "../../Entities/ITransactionType";

type SampleMessageDialogResolve = (value: IOrderDialogResult) => void;
type SampleMessageDialogReject = (reason: any) => void;

export default class OrderDialog extends Dialogs.ExtensionTemplatedDialogBase {
    public messagePassedToDialog: ko.Observable<string>;
    public userEnteredValue: ko.Observable<string>;

    private resolve: SampleMessageDialogResolve;
    constructor() {
        super();
        this.userEnteredValue = ko.observable("");
    }

    public onReady(element: HTMLElement): void {
        ko.applyBindings(this, element);
    }

    public open(message: string): Promise<IOrderDialogResult> {
        this.userEnteredValue(message);

        let promise: Promise<IOrderDialogResult> = new Promise((resolve: SampleMessageDialogResolve, reject: SampleMessageDialogReject) => {
            this.resolve = resolve;
            let option: Dialogs.ITemplatedDialogOptions = {
                //title: "Templated dialog sample",
                //subTitle: "Dialog sub title",
                //onCloseX: this.onCloseX.bind(this),
                //button1: {
                //    id: "Button1",
                //    label: "OK",
                //    isPrimary: true,
                //    onClick: this.button1ClickHandler.bind(this)
                //},
                //button2: {
                //    id: "Button2",
                //    label: "Cancel",
                //    onClick: this.button2ClickHandler.bind(this)
                //}
            };

            this.openDialog(option);
        });

        //  this.setButtonDisabledState("Button1", true);

        return promise;
    }

    public diningorderclicked(): void {
        this.context.navigator.navigate("SectionListView")
        this.closeDialog();
        this.resolvePromise(TransactionType.Dining);
    }

    public takeawayordeeclicked(): void {
        this.closeDialog();
        this.resolvePromise(TransactionType.Takeaway);
    }

    private resolvePromise(result: string): void {
        if (ObjectExtensions.isFunction(this.resolve)) {
            this.resolve(<IOrderDialogResult>{
                selectedValue: result
            });

            this.resolve = null;
        }
    }
}