package pl.edu.pk.wieik.productionScheduler.schedule.dto;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@Builder
@ToString
@EqualsAndHashCode
public class ScheduleTask {
   private Long id;
   private String name;
   private int p; // qi - czas wykonania zadania
   private int q; // copy of p
   private int t; // czas wykonania zadania krytycznego
   private List<Integer> B; //spytać DD
   private int d = 0; // najwcześnieszy możliwy temin rozpoczęcia zadania
   private int a; //liczba procesorów żadanych
   private int h; //liczba zadań w zbiorze E;
   private int w; // priorytet zadania w = a * p
   private List<ScheduleTask> E = new ArrayList<>(); //zadania poprzedzające

}
