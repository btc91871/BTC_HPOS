using Microsoft.Dynamics.Commerce.Runtime.DataModel;
using Microsoft.Dynamics.Commerce.Runtime.Hosting.Contracts;
using Microsoft.Dynamics.Commerce.Runtime;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Contoso.StoreCommercePackagingSample.CommerceRuntime.TableManagement;
using Contoso.StoreCommercePackaging.CommerceRuntime.TableManagement;

namespace Contoso.StoreCommercePackagingSample.CommerceRuntime.Controllers
{
    [RoutePrefix("TableModel")]
    [BindEntity(typeof(TableModel))]
    public class TableController : IController
    {
        [HttpPost]
        [Authorization(CommerceRoles.Anonymous, CommerceRoles.Customer, CommerceRoles.Device, CommerceRoles.Employee)]
        public async Task<PagedResult<TableModel>> getTableFields(IEndpointContext context, QueryResultSettings queryResultSettings)
        {
            try
            {
                var request = new TableRequest() { QueryResultSettings = queryResultSettings };
                var response = await context.ExecuteAsync<TableResponse>(request).ConfigureAwait(false);
                return response.Result;
            }
            catch (Exception ex)
            {
                throw new ArgumentNullException("request");
            }
        }
    }
}