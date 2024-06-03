
namespace GoPaveServer.Models
{
    public class MessageServiceConfiguration
    {
        public string Server { get; set; }
        public int    Port   { get; set; }
        public bool   UseSSL { get; set; }
        public string ServerUserName { get; set; }
        public string ServerPassword { get; set; }
        public int    Timeout        { get; set; }
        public string FromAddress    { get; set; }
        public string ReplyToAddress { get; set; }
        public string Subject        { get; set; }
    }
}
