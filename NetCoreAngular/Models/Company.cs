namespace NetCoreAngular.Models
{
    public class Company
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Tel { get; set; }
        public string Email { get; set; }

        public int? ImageId { get; set; }
        public virtual FileUpload Image { get; set; }
    }
}
