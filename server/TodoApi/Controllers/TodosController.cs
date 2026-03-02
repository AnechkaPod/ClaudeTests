using Microsoft.AspNetCore.Mvc;
using TodoApi.Models;

namespace TodoApi.Controllers;

[ApiController]
[Route("api/todos")]
public class TodosController : ControllerBase
{
    private static readonly List<TodoItem> _todos = new();
    private static int _nextId = 1;

    [HttpGet]
    public IActionResult GetAll() => Ok(_todos);

    [HttpPost]
    public IActionResult Create(TodoItem input)
    {
        var todo = new TodoItem
        {
            Id = _nextId++,
            Title = input.Title,
            IsComplete = false
        };
        _todos.Add(todo);
        return CreatedAtAction(nameof(GetAll), new { id = todo.Id }, todo);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, TodoItem input)
    {
        var todo = _todos.FirstOrDefault(t => t.Id == id);
        if (todo is null) return NotFound();

        todo.Title = input.Title;
        todo.IsComplete = input.IsComplete;
        return Ok(todo);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var todo = _todos.FirstOrDefault(t => t.Id == id);
        if (todo is null) return NotFound();

        _todos.Remove(todo);
        return NoContent();
    }
}
