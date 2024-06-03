﻿using System.Threading.Tasks;

namespace GoPaveServer.Interfaces
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string subject, string message);
    }
}
