package ajax.controller.api;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import ajax.domain.Item;
import ajax.dto.JsonResult;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/item")
public class ItemController {
	private final List<Item> items;

	public ItemController(@Qualifier("items") List<Item> items) {
		this.items = items;
	}
	
	@PostMapping
	public ResponseEntity<JsonResult<Item>> create(@RequestBody Item item) { //요청하는 json스트링을 자바객체로 변환 
		log.info("Request[POST /item, Content-Type: application/json][{}]", item);
		
		Long maxId = Optional
			.ofNullable(items.isEmpty() ? null : items.getFirst())
			.map(t -> t.getId()) //null일 땐 안 함
			.orElse(0L); //orElse 는 get이랑 동일한데, null일 경우를 처리할 수 있음
				
		
		item.setId(maxId + 1);
		items.addFirst(item);
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(item));
	}
	
	@Operation(summary = "Create a New Item")
	@ApiResponses(value = {
	       @ApiResponse(responseCode = "200", description = "successful operation", content = @Content(schema = @Schema(implementation = JsonResult.class))),
	       @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema(implementation = JsonResult.class)))
	})
	//accept-header 내용 다르므로 갠춘 
	@PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE}) 
	public ResponseEntity<JsonResult<Item>> create(Item item, MultipartFile file) { 
		log.info("Request[POST /item, Content-Type: multipart/form-data][{}, {}]", item, file.getOriginalFilename());
		
		try {
			// 파일 이름 생성
			final String saveFilename = UUID
				.randomUUID()
				.toString()
				.concat(".")
				.concat(file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf('.')+1));
			
			// 디렉토리 생성, 파일 복사 (Path 객체 만들면 여기에서 디렉토리 만들고 파일 이름 붙여서 다시 Path 객체 리턴)
			Files.write(Files
					.createDirectories(Paths.get("/Users/ko/ajax-practices-uploads/images"))
					.resolve(saveFilename), file.getBytes());
			
			// 새로 Item 추가하기 위한 maxId 찾기
			Long maxId = Optional
				.ofNullable(items.isEmpty() ? null : items.getFirst())
				.map(t -> t.getId())
				.orElse(0L);
			
			// Item 추가
			item.setId(maxId + 1);
			item.setImage("/assets/images/" + saveFilename); // assets로 들어오면 static-locations 로 설정된 곳들에서 찾음 
			items.addFirst(item);
			
			return ResponseEntity
					.status(HttpStatus.OK)
					.body(JsonResult.success(item));
		} catch(Exception ex) {
			throw new RuntimeException(ex);
		}
	}
	
	
	@GetMapping
	public ResponseEntity<JsonResult<List<Item>>> read() {
		log.info("Request[GET /item]");
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(items));
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<JsonResult<Item>> read(@PathVariable Long id) {
		log.info("Request[GET /item/{id}]");
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(items
						.stream()
						.filter(t -> t.getId() == id)
						.findAny() //id 같은 것 중 아무거나 내놔
						.orElse(null)));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<JsonResult<Item>> update(@PathVariable Long id, Item item) {
		log.info("Request[PUT /item/{id}, Content-Type: application/x-www-form-urlencoded][{}]", id);
		
		int index = items.indexOf(new Item(id));
		
		Optional<Item> optionalItem = Optional.ofNullable(index == -1 ? null : items.get(index));
		optionalItem.ifPresent((Item t) -> { //null 이면 아무것도 안 함
			t.setName(item.getName());
			t.setType(item.getType());
		});
		
		return ResponseEntity
					.status(HttpStatus.OK)
					.body(JsonResult.success(optionalItem.orElse(item))); //null이면 기존 item 전달
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<JsonResult<Long>> delete(@PathVariable Long id) {
		log.info("Request[DELETE /item/{}]", id);
		
		//items 돌면서 true면 지워버림
		return ResponseEntity
					.status(HttpStatus.OK)
					.body(JsonResult.success(items.removeIf(t -> t.getId() == id)? id : -1));
	}
}
