using System.Runtime.Serialization;
using Microsoft.Dynamics.Commerce.Runtime;
using Microsoft.Dynamics.Commerce.Runtime.Messages;


namespace Contoso.StoreCommercePackaging.CommerceRuntime.SectionManagement
{
   
    [DataContract]
    public class SectionResponse : Response
    {
        public SectionResponse(PagedResult<SectionModel> result)
        {
            this.Result = result;
        }

        [DataMember]
        public PagedResult<SectionModel> Result { get; set; }
    }
}