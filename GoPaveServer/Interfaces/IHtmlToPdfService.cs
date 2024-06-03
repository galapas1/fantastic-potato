using GoPaveServer.Models;

namespace GoPaveServer.Interfaces
{
    public interface IHtmlToPdfService
    {
        byte[] HtmlToPdf(Project project, string emailAddress);
    }
}
