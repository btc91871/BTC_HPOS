using Microsoft.Dynamics.Commerce.Runtime;
using Microsoft.Dynamics.Commerce.Runtime.Data;
using Microsoft.Dynamics.Commerce.Runtime.Messages;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.Dynamics.Commerce.Runtime.DataModel;
using Microsoft.Dynamics.Commerce.Runtime.DataAccess.SqlServer;
using Microsoft.Dynamics.Commerce.Runtime.RealtimeServices.Messages;
using System.Collections.ObjectModel;
using Microsoft.Dynamics.Commerce.Runtime.Data.Types;
using Contoso.StoreCommercePackaging.CommerceRuntime.SectionManagement;

namespace Contoso.StoreCommercePackaging.CommerceRuntime.SectionManagement
{
    public class SectionService : IRequestHandlerAsync
    {
        public IEnumerable<Type> SupportedRequestTypes
        {
            get
            {
                return new[]
                {
                 typeof(SectionRequest),
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
            if (reqType == typeof(SectionRequest))
            {
                return await this.getSectionFields((SectionRequest)request).ConfigureAwait(false);
            }
            else
            {
                string message = string.Format(CultureInfo.InvariantCulture, "Request '{0}' is not supported.", reqType);
                Console.WriteLine(message);
                throw new NotSupportedException(message);
            }
        }

        private async Task<Response> getSectionFields(SectionRequest request)
        {
            try
            {
                using (DatabaseContext databaseContext = new DatabaseContext(request.RequestContext))
                {
                    var query = new SqlPagedQuery(request.QueryResultSettings)
                    {
                        DatabaseSchema = "ext",
                        Select = new ColumnSet("SECTIONID","NAME","DESCRIPTION","CODE","ORDERID","STATUS","CAPACITY","FLOORNUMBER","ISOUTDOOR","SPECIALFEATURES","LASTUPDATED","STORE", "CHANNELID","DATAAREAID"),
                        From = "BTC_SECTION",
                        OrderBy = "CODE",
                        Where = "DATAAREAID = @DATAAREAID"
                    };
                    query.Parameters.Add("@DATAAREAID", request.RequestContext.GetChannelConfiguration().InventLocationDataAreaId);
                    return new SectionResponse(await databaseContext.ReadEntityAsync<SectionModel>(query).ConfigureAwait(false));
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentNullException("request");
            }
        }

    }
}
