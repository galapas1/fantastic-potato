using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace GoPaveServer.Services
{
    public class ProducerOperationsFilter : IOperationFilter
    {
        public void Apply(Operation operation, OperationFilterContext context)
        {
            switch (operation.OperationId)
            {
                case "ApiProjectsPrintByIdGet":
                case "ApiProjectsPrintPost":
                    operation.Produces = new[] { "application/json", "application/octet-stream" };
                    operation.Responses["200"].Schema = new Schema { Type = "inline" };
                    break;

                default:
                    break;
            }
        }
    }
}
