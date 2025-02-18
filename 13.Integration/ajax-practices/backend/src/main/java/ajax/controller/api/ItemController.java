package ajax.controller.api;

import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ajax.domain.Item;
import ajax.dto.JsonResult;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/item")
public class ItemController {
	private final List<Item> items;

	public ItemController(@Qualifier("items") List<Item> items) {
		this.items = items;
	}
	
	//create
	@PostMapping
	public ResponseEntity<JsonResult<Item>> create(@RequestBody Item item) { //요청하는 json스트링을 자바객체로 변환 
		log.info("Request[POST /api, Content-Type: application/json][{}]", item);
		
		Long maxId = Optional
			.ofNullable(items.isEmpty() ? null : items.getFirst())
			.map(t -> t.getId()) //null일 땐 안 함
			.orElse(0L); //orElse 는 get이랑 동일한데, null일 경우를 처리할 수 있음
				
		
//		Long maxId = items.getFirst().getId(); //첫번째꺼 가져옴
		
		item.setId(maxId + 1);
		items.addFirst(item);
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(item));
	}
	
	// json 타입으로 body 응답할거
	// [{}, {}, {}, ...] = List<Item>
	@GetMapping
	public ResponseEntity<JsonResult<List<Item>>> read() {
//		if(true) {
//			throw new RuntimeException("test");
//		}
		log.info("Request[GET /api]");
		
		return ResponseEntity
			.status(HttpStatus.OK)
			.body(JsonResult.success(items));
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<JsonResult<Item>> read(@PathVariable Long id) {
		log.info("Request[GET /api/{id}]");
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(items
						.stream()
						.filter(t -> t.getId() == id)
						.findAny() //id 같은 것 중 아무거나 내놔
						.orElse(null)));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<JsonResult<Long>> delete(@PathVariable Long id) {
		log.info("Request[DELETE /api/{}]", id);
		
		//items 돌면서 true면 지워버림
		return ResponseEntity
					.status(HttpStatus.OK)
					.body(JsonResult.success(items.removeIf(t -> t.getId() == id)? id : -1));
	}
}
