using TodoApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors();

var todos = new List<TodoItem>();
var nextId = 1;

app.MapGet("/api/todos", () => todos);

app.MapPost("/api/todos", (TodoItem input) =>
{
    var todo = new TodoItem
    {
        Id = nextId++,
        Title = input.Title,
        IsComplete = false
    };
    todos.Add(todo);
    return Results.Created($"/api/todos/{todo.Id}", todo);
});

app.MapPut("/api/todos/{id}", (int id, TodoItem input) =>
{
    var todo = todos.FirstOrDefault(t => t.Id == id);
    if (todo is null) return Results.NotFound();

    todo.Title = input.Title;
    todo.IsComplete = input.IsComplete;
    return Results.Ok(todo);
});

app.MapDelete("/api/todos/{id}", (int id) =>
{
    var todo = todos.FirstOrDefault(t => t.Id == id);
    if (todo is null) return Results.NotFound();

    todos.Remove(todo);
    return Results.NoContent();
});

app.Run("http://localhost:5000");
