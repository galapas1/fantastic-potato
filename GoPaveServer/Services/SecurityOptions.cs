
namespace GoPaveServer.Services
{
    public class SecurityOptions
    {
        public bool RequireConfirmationEmail { get; set; }
        public int  TokenTTL                 { get; set; }
        public string ApiSecretKey           { get; set; }
    }
}
