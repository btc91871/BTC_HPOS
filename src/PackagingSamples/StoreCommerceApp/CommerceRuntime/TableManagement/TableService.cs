using Microsoft.Dynamics.Commerce.Runtime;
using Microsoft.Dynamics.Commerce.Runtime.Data;
using Microsoft.Dynamics.Commerce.Runtime.Messages;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Threading.Tasks;
using Contoso.StoreCommercePackagingSample.CommerceRuntime.TableManagement;

namespace Contoso.StoreCommercePackaging.CommerceRuntime.TableManagement
{
    public class TableService : IRequestHandlerAsync
    {
        public IEnumerable<Type> SupportedRequestTypes
        {
            get
            {
                return new[]
                {
                 typeof(TableRequest),
                };
            }
        }
        public async Task<Response> Execute(Request request)
        {
            if (request == null)
            {
                throw new ArgumentNullException("request");
            }
            Type reqType = request.GetType();
            if (reqType == typeof(TableRequest))
            {
                return await this.getTableFields((TableRequest)request).ConfigureAwait(false);
            }
            else
            {
                string message = string.Format(CultureInfo.InvariantCulture, "Request '{0}' is not supported.", reqType);
                Console.WriteLine(message);
                throw new NotSupportedException(message);
            }
        }

        private async Task<Response> getTableFields(TableRequest request)
        {
            try
            {
                using (DatabaseContext databaseContext = new DatabaseContext(request.RequestContext))
                {
                    var query = new SqlPagedQuery(request.QueryResultSettings)
                    {
                        DatabaseSchema = "ext",
                        Select = new ColumnSet("BTC_TABLEID", "TABLENAME", "CAPACITY", "ISOCCUPIED","ISCHECKEDOUT", "ISMERGED", "CREATEDON", "RECID","DATAAREAID", "ISBLOCKED","SECTIONID", "TABLESINSECTION", "CHAIRCOUNT"),
                        From = "BTC_TABLEDETAILS",
                        OrderBy= "RECID",
                        Where = "DATAAREAID = @DATAAREAID"
                    };
                    query.Parameters.Add("@DATAAREAID", request.RequestContext.GetChannelConfiguration().InventLocationDataAreaId);
                    return new TableResponse(await databaseContext.ReadEntityAsync<TableModel>(query).ConfigureAwait(false));
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentNullException("request");
            }
        }

    }
}
