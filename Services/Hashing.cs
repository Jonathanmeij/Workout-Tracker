using System.Security.Cryptography;
using System.Text;

namespace Workout_Track_app;

public static class Hashing
{
    public static byte[] Hash(string input, byte[] salt)
    {
        using (var algorithm = new System.Security.Cryptography.HMACSHA256(salt))
        {
            var hash = algorithm.ComputeHash(Encoding.UTF8.GetBytes(input));
            return hash;
        }
    }

    public static byte[] GenerateSalt()
    {
        var salt = new byte[128 / 8];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(salt);
        }
        return salt;
    }

   public static bool VerifyHash(string input, string hash, byte[] salt, ILogger logger){
    
        var HashedInput = Hash(input, salt);
        var HashedInputString = Convert.ToBase64String(HashedInput);
        // logger.LogInformation("HashedInputString: " + HashedInputString);
        // logger.LogInformation("hash: " + hash);
        // logger.LogInformation("salt: " + Convert.ToBase64String(salt));
        return HashedInputString == hash;
    }

   
   
}