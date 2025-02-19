package kanbanboard.controller.api;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kanbanboard.domain.Card;
import kanbanboard.domain.Task;
import kanbanboard.dto.JsonResult;
import kanbanboard.repository.CardRepository;
import kanbanboard.repository.TaskRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/kanbanboard")
public class ApiController {

	private final CardRepository cardRepository;
	private final TaskRepository taskRepository;

	public ApiController(CardRepository cardRepository, TaskRepository taskRepository) {
		this.cardRepository = cardRepository;
		this.taskRepository = taskRepository;
	}

	@GetMapping
	public ResponseEntity<JsonResult<List<Card>>> read() {
		
		return ResponseEntity
					.status(HttpStatus.OK)
					.body(JsonResult.success(cardRepository.findAll()));
	}
	
	@GetMapping("/task")
	public ResponseEntity<JsonResult<List<Task>>> read(@RequestParam Long cardNo) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(taskRepository.findAllByCardNo(cardNo)));
	}
	
	@PostMapping("/task")
	public ResponseEntity<JsonResult<Task>> create(@RequestBody Task task) { //요청하는 json스트링을 자바객체로 변환 
		taskRepository.insert(task);
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(task));
	}
	
	@PutMapping("/task/{no}")
	public ResponseEntity<JsonResult<Task>> update(@PathVariable Long no, @RequestParam String done) {
		
		taskRepository.updateDone(no, done);
		Task task = new Task();
		task.setNo(no);
		task.setDone(done);
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(task));
	}
	
	@DeleteMapping("/task/{no}")
	public ResponseEntity<JsonResult<Long>> delete(@PathVariable Long no) {
		
		Boolean result = taskRepository.delete(no);
		if (!result) {
			no = -1L;
		}
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(no));
	}
	
	
}
