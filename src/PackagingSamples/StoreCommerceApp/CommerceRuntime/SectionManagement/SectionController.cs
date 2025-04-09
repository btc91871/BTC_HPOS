using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Dynamics.Commerce.Runtime.DataModel;
using Microsoft.Dynamics.Commerce.Runtime.Hosting.Contracts;
using Microsoft.Dynamics.Commerce.Runtime;
using System.Threading.Tasks;
using Contoso.StoreCommercePackaging.CommerceRuntime.SectionManagement;

namespace Contoso.StoreCommercePackaging.CommerceRuntime.Controllers
{
    [RoutePrefix("SectionModel")]
    [BindEntity(typeof(SectionModel))]
    public class SectionController : IController
    {
        [HttpPost]
        [Authorization(CommerceRoles.Anonymous, CommerceRoles.Customer, CommerceRoles.Device, CommerceRoles.Employee)]
        public async Task<PagedResult<SectionModel>> getSectionFields(IEndpointContext context, QueryResultSettings queryResultSettings)

        {
            try
            {

                var request = new SectionRequest() { QueryResultSettings = queryResultSettings };
                var response = await context.ExecuteAsync<SectionResponse>(request).ConfigureAwait(false);
                return response.Result;
            }
            catch (Exception ex)
            {
                throw new ArgumentNullException("request");
            }
        }
    }

}
