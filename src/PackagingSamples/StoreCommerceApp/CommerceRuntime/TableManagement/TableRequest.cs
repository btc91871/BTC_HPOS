using System.Runtime.Serialization;
using Microsoft.Dynamics.Commerce.Runtime.Messages;

namespace Contoso.StoreCommercePackaging.CommerceRuntime.TableManagement
{
    [DataContract]
    public class TableRequest : Request
    {
        public TableRequest()
        {
        }
    }
}
