using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Server.Models
{
    public class JobApplication
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("jobId")]
        public string JobId { get; set; } = string.Empty;

        [BsonElement("jobTitle")]
        public string JobTitle { get; set; } = string.Empty;

        [BsonElement("jobCompany")]
        public string JobCompany { get; set; } = string.Empty;

        [BsonElement("userId")]
        public string UserId { get; set; } = string.Empty;

        [BsonElement("firstName")]
        public string FirstName { get; set; } = string.Empty;

        [BsonElement("lastName")]
        public string LastName { get; set; } = string.Empty;

        [BsonElement("email")]
        public string Email { get; set; } = string.Empty;

        [BsonElement("phone")]
        public string Phone { get; set; } = string.Empty;

        [BsonElement("city")]
        public string City { get; set; } = string.Empty;

        [BsonElement("linkedin")]
        public string LinkedIn { get; set; } = string.Empty;

        [BsonElement("portfolio")]
        public string Portfolio { get; set; } = string.Empty;

        [BsonElement("currentRole")]
        public string CurrentRole { get; set; } = string.Empty;

        [BsonElement("experience")]
        public string Experience { get; set; } = string.Empty;

        [BsonElement("currentSalary")]
        public string CurrentSalary { get; set; } = string.Empty;

        [BsonElement("noticePeriod")]
        public string NoticePeriod { get; set; } = string.Empty;

        [BsonElement("resumeName")]
        public string ResumeName { get; set; } = string.Empty;

        [BsonElement("coverLetter")]
        public string CoverLetter { get; set; } = string.Empty;

        /// <summary>Applied | Reviewed | Shortlisted | Rejected</summary>
        [BsonElement("status")]
        public string Status { get; set; } = "Applied";

        [BsonElement("appliedAt")]
        public DateTime AppliedAt { get; set; } = DateTime.UtcNow;
    }
}
