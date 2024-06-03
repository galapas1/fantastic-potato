using GoPaveServer.Interfaces;
using GoPaveServer.Models;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MimeKit;
using System.Threading.Tasks;
using System;

namespace GoPaveServer.Services
{
    public class MessageService : IEmailSender, ISmsSender
    {
        private MessageServiceConfiguration smtpconfig;
        private readonly ILogger logger;

        public MessageService(IOptions<MessageServiceConfiguration> SMTPConfig,
                              ILoggerFactory                        loggerFactory)
        {
            this.logger     = loggerFactory.CreateLogger(this.ToString());
            this.smtpconfig = SMTPConfig.Value;
        }

        public Task SendEmailAsync(string email, string subject, string mailmessage)
        {
            using(SmtpClient mm = new SmtpClient())
            {
                MimeMessage mailMsg = new MimeMessage();
                mailMsg.To     .Add(new MailboxAddress("", email));
                mailMsg.From   .Add(new MailboxAddress("", smtpconfig.FromAddress));
                mailMsg.ReplyTo.Add(new MailboxAddress("", smtpconfig.ReplyToAddress));
                mailMsg.Subject = subject;

                BodyBuilder bodyBuilder = new BodyBuilder();
                bodyBuilder.HtmlBody = mailmessage;
                mailMsg.Body = bodyBuilder.ToMessageBody();

                mm.ServerCertificateValidationCallback = (s,c,h,e) => true;
                mm.Connect(smtpconfig.Server, smtpconfig.Port, false);

                if (!(string.IsNullOrEmpty(smtpconfig.ServerUserName) &&
                      string.IsNullOrEmpty(smtpconfig.ServerPassword)))
                {
                    mm.Authenticate(smtpconfig.ServerUserName,
                                    smtpconfig.ServerPassword);
                }

                mm.AuthenticationMechanisms.Remove ("XOAUTH2");
                if(smtpconfig.Timeout > 0)
                {
                    mm.Timeout = smtpconfig.Timeout;
                }

                try
                {
                    mm.Send       (mailMsg);
                    mm.Disconnect (true);
                }
                catch(Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }
            return Task.FromResult(0);
        }

        public Task SendSmsAsync(string number, string message)
        {
            throw new Exception("SMS Not Implemented");
        }
    }
}
