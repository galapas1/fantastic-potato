using System.Threading.Tasks;

namespace GoPaveServer.Interfaces
{
    public interface ISmsSender
    {
        Task SendSmsAsync(string number, string message);
    }
}
