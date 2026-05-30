using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Server.Models
{
    public class Job
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("title")]
        public string Title { get; set; } = string.Empty;

        [BsonElement("company")]
        public string Company { get; set; } = string.Empty;

        [BsonElement("location")]
        public string Location { get; set; } = string.Empty;

        [BsonElement("type")]
        public string Type { get; set; } = string.Empty; // Full-time, Part-time, Contract, Remote

        [BsonElement("category")]
        public string Category { get; set; } = string.Empty; // Engineering, Design, etc.

        [BsonElement("salary")]
        public string Salary { get; set; } = string.Empty; // e.g. "₹8L – ₹12L / yr"

        [BsonElement("salaryMin")]
        public int SalaryMin { get; set; } // e.g. 800000

        [BsonElement("experience")]
        public string Experience { get; set; } = string.Empty; // e.g. "2–4 Years"

        [BsonElement("openings")]
        public int Openings { get; set; } = 1;

        [BsonElement("color")]
        public string Color { get; set; } = "#2d7ef7"; // Accent color for cards

        [BsonElement("description")]
        public string Description { get; set; } = string.Empty;

        [BsonElement("requirements")]
        public List<string> Requirements { get; set; } = new();

        [BsonElement("responsibilities")]
        public List<string> Responsibilities { get; set; } = new();

        [BsonElement("benefits")]
        public List<string> Benefits { get; set; } = new();

        [BsonElement("isNew")]
        public bool IsNew { get; set; } = true;

        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [BsonElement("companyId")]
        public string? CompanyId { get; set; }
    }
}
