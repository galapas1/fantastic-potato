namespace GoPaveServer.Models
{
    public class AuditEntry
    {
        public int? ID             { get; set; }

        public string UserName     { get; set; }
        public string Time         { get; set; }
        public string Action       { get; set; }
        public bool   HasError     { get; set; }
        public string ErrorMessage { get; set; }
    }
}
