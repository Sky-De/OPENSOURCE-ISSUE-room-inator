package anushibin007.roominator.backend.repo;

import anushibin007.roominator.backend.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, String> {
    Optional<Room> findById(String s);
    List<Room> findAll();
}
