namespace Insurance.Poc.Core.Services;

public interface ICachingInMemoryService
{
   T Get<T>(string key);
   void Set<T>(string key, T value, TimeSpan? expirationTime = null);
   void Remove(string key);
   void Clear();
}
