namespace QQKraken.Api.Services
{
    public interface IIdentityService
    {
        bool IsAuthenticated();
        string GetMail();
        string GetId();
    }
}
