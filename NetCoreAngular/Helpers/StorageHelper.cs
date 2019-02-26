using Microsoft.AspNetCore.Http;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace NetCoreAngular.Helpers
{
    public class StorageHelper
    {
        public static bool IsImage(IFormFile file)
        {
            if (file.ContentType.Contains("image"))
            {
                return true;
            }

            string[] formats = new string[] { ".jpg", ".png", ".gif", ".jpeg" };

            return formats.Any(item => file.FileName.EndsWith(item, StringComparison.OrdinalIgnoreCase));
        }

        public static async Task<bool> UploadFileToStorage(Stream fileStream, string fileName, string storageAccount)
        {
            // Create storagecredentials object by reading the values from the configuration (appsettings.json)
            //StorageCredentials storageCredentials = new StorageCredentials(_storageConfig.AccountName, _storageConfig.AccountKey);

            // Create cloudstorage account by passing the storagecredentials
            CloudStorageAccount account = CloudStorageAccount.Parse(storageAccount);

            // Create the blob client.
            CloudBlobClient blobClient = account.CreateCloudBlobClient();

            // Get reference to the blob container by passing the name by reading the value from the configuration (appsettings.json)
            CloudBlobContainer container = blobClient.GetContainerReference("images");
            //await container.CreateIfNotExistsAsync();

            // Get the reference to the block blob from the container
            CloudBlockBlob blockBlob = container.GetBlockBlobReference(fileName);
            

            // Upload the file
            await blockBlob.UploadFromStreamAsync(fileStream);

            return await Task.FromResult(true);
        }
    }
}
