using System.Runtime.Serialization;
using Microsoft.Dynamics.Commerce.Runtime;
using Microsoft.Dynamics.Commerce.Runtime.Messages;

namespace Contoso.StoreCommercePackagingSample.CommerceRuntime.TableManagement
{
    [DataContract]
    public class TableResponse : Response
    {
        public TableResponse(PagedResult<TableModel> result)
        {
            this.Result = result;
        }

        [DataMember]
        public PagedResult<TableModel> Result { get; set; }
    }
}
