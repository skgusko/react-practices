package ajax.domain;

import lombok.*;

@Getter
@Setter
@ToString //객체의 toString() 메서드를 자동 생성
@NoArgsConstructor //기본 생성자 자동 생성
@AllArgsConstructor //모든 필드를 포함하는 생성자 자동 생성
@RequiredArgsConstructor //final 또는 @NonNull 필드만 포함하는 생성자 자동 생성
@EqualsAndHashCode(exclude = {"type", "name", "image"}) //equals() 및 hashCode() 메서드를 자동 생성하지만, 지정한 필드는 제외
public class Item {
	@NonNull
	private Long id;

	@NonNull
	private String type;

	@NonNull
	private String name;

	private String image;
	
	public Item(Long id) {
		this.id = id;
	}

}