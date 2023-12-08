using Microsoft.Extensions.Options;
using MongoDB.Driver;
using TaskManagementAPI.Models;
using TaskManagementAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// dealing with cors to allow fetch from react
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "_myAllowSpecificOrigins", policy =>
    {
        policy.AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

builder.Services.AddControllers();

// Add services to the container.
builder.Services.Configure<QuestStoreDatabaseSettings>(builder.Configuration.GetSection(nameof(QuestStoreDatabaseSettings)));
builder.Services.AddSingleton<IQuestStoreDatabaseSettings>(sp => sp.GetRequiredService<IOptions<QuestStoreDatabaseSettings>>().Value);
builder.Services.AddSingleton<IMongoClient>(s => new MongoClient(builder.Configuration.GetValue<string>("QuestStoreDatabaseSettings:ConnectionString")));
builder.Services.AddScoped<IQuestService, QuestService>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors("_myAllowSpecificOrigins");

app.MapControllers();

app.Run();
