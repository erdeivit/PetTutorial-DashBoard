import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA , MatSnackBar} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AppConfig } from '../../../../app.config';
import { Login, Student, Role, Competition, Journey, Match, Team, Point, PointRelation,
  School, Badge, BadgeRelation, CollectionCard, Card} from '../../../../shared/models/index';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { LoadingService, UtilsService, AlertService, TeamService, CompetitionService,
  JourneyService, PointRelationService, PointService, SchoolService, GroupService,
  BadgeService, BadgeRelationService, CollectionService } from '../../../../shared/services/index';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-classification',
  templateUrl: './classification.html',
  styleUrls: ['./classification.scss']
})
export class ClassificationComponent implements OnInit {

  public competition: Competition;
  public competitionId: string;
  public modeIndividual: boolean;

  public journeys: Journey[];
  public participants: Participant[];
  public odd: boolean;
  public matchesJourneys: Array<Array<Match>>;

  // PREMIOS
    // BestParticipants
    public GroupIdAwards: string;
    public SchoolIdAwards: string;
    public Primer_name: string;
    public Primer_Id: string;
    public Segon_name: string;
    public Segon_Id: string;
    public Team1: Array<Student>;
    public Team2: Array<Student>;

    // Point
    public Primer_p_value: number; // Valor del punto que se le enviará al 1er clasificado
    public Primer_point: Point;
    public Primer_PointRelation: PointRelation;
    public Segon_p_value: number; // Valor del punto que se le enviará al 2do clasificado
    public Segon_point: Point;
    public Segon_PointRelation: PointRelation;

    // Badges
    public Primer_b_value: number; // Valor del punto que se le enviará al 1er clasificado
    public Primer_badge: Badge;
    public Primer_BadgeRelation: BadgeRelation;
    public Segon_b_value: number; // Valor del punto que se le enviará al 2do clasificado
    public Segon_badge: Badge;
    public Segon_BadgeRelation: BadgeRelation;

    // Collections
    myControl = new FormControl();
    public count: number;
      // Sacar collections del grupo
      public collections: Array<CollectionCard>; // collections of the group
      public CollectionSelected: CollectionCard; // selected collection in the mat-select
      public collectionCards: Array<Card>; // cards of the CollectionSelected, options[0]
      // Asignar cromos
      public optionType: string; // selected option
      public options = [];
      public cardSelected: string; //
      // Students
      public collectionStudents: Array<Student>;
      public studentSelected: string;


  public scores = new Array<Score>();
  public score: Score;

  constructor(public utilsService: UtilsService,
    public loadingService: LoadingService,
    public alertService: AlertService,
    public journeyService: JourneyService,
    public schoolService: SchoolService,
    public pointService: PointService,
    public pointRelationService: PointRelationService,
    public groupService: GroupService,
    public translateService: TranslateService,
    public badgeService: BadgeService,
    public badgeRelationService: BadgeRelationService,
    public collectionService: CollectionService,
    public snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private teamService: TeamService,
    private competitionService: CompetitionService) {
    this.utilsService.currentUser = Login.toObject(localStorage.getItem(AppConfig.LS_USER));
    this.utilsService.role = Number(localStorage.getItem(AppConfig.LS_ROLE));
  }

  ngOnInit() {
    if (this.utilsService.role === Role.TEACHER || this.utilsService.role === Role.STUDENT) {
      this.options.push(this.translateService.instant('CARDS.ASSIGNMENTTYPE1'));
      this.options.push(this.translateService.instant('CARDS.ASSIGNMENTTYPE2'));
      this.options.push(this.translateService.instant('CARDS.ASSIGNMENTTYPE3'));
      this.options.push(this.translateService.instant('CARDS.ASSIGNMENTTYPE4'));
      this.loadingService.show();
      this.competitionId = this.route.snapshot.paramMap.get('id');
      this.getClassificationOfCompetition();
    }
  }

  getClassificationOfCompetition(): void {
    this.competitionService.getCompetition(this.competitionId)
      .subscribe(((competition: Competition) => {
        this.competition = competition;
        this.getJourneys();
      }),
        ((error: Response) => {
          this.loadingService.hide();
          this.alertService.show(error.toString());
        }));
  }

  getJourneys(): void {
    this.journeyService.getJourneysCompetition(this.competitionId).subscribe(
      ((journeys: Array<Journey>) => {
        this.journeys = journeys;
        this.getMatches();
      }),
      ((error: Response) => {
        this.loadingService.hide();
        this.alertService.show(error.toString());
      }));
  }

  getMatches(): void {
    let countJourneys = 0;
    this.matchesJourneys = [];
    for (let _j = 0; _j < this.journeys.length; _j++) {
      this.matchesJourneys[_j] = [];
      this.journeyService.getMatchesJourneyDetails(this.journeys[_j].id, this.competition).subscribe(
        ((matches: Array<Match>) => {
          countJourneys = countJourneys + 1;
          for (let _m = 0; _m < matches.length; _m++) {
            this.matchesJourneys[_j][_m] = new Match();
            this.matchesJourneys[_j][_m] = matches[_m];
          }
          if (countJourneys === this.journeys.length) {
            this.getParticipants();
          }
        }),
        ((error: Response) => {
          this.loadingService.hide();
          this.alertService.show(error.toString());
        }));
    }
  }

  getParticipants(): void {
    this.participants = [];
    if (this.competition.mode === 'Individual') {
      this.modeIndividual = true;
      this.competitionService.getStudentsCompetition(this.competitionId)
        .subscribe(((students: Array<Student>) => {
          this.collectionStudents = students;
          if (students.length % 2 === 0) { this.odd = false; } else { this.odd = true; }
          for (let _s = 0; _s < students.length; _s++) {
            this.participants[_s] = {
              id: +students[_s].id,
              name: students[_s].name.concat(' ', students[_s].surname)
            };
          }
          this.getScores();
        }),
          ((error: Response) => {
            this.loadingService.hide();
            this.alertService.show(error.toString());
          }));
    } else {
      this.modeIndividual = false;
      this.teamService.getTeamsCompetition(this.competitionId)
        .subscribe(((teams: Array<Team>) => {
          if (teams.length % 2 === 0) { this.odd = false; } else { this.odd = true; }
          for (let _t = 0; _t < teams.length; _t++) {
            this.participants[_t] = {
              id: +teams[_t].id,
              name: teams[_t].name
            };
          }
          this.getScores();
        }),
          ((error: Response) => {
            this.loadingService.hide();
            this.alertService.show(error.toString());
          }));
    }
  }

  getScores(): void {
    this.scores = [];
    for (let _p = 0; _p < this.participants.length; _p++) {
      this.score = {
        position: 0, name: this.participants[_p].name,
        played: 0, won: 0, draw: 0, lost: 0, points: 0
      };
      for (let _j = 0; _j < this.journeys.length; _j++) {
        let found = false;
        for (let _m = 0; _m < this.matchesJourneys[_j].length && !found; _m++) {
          if (+this.participants[_p].id === this.matchesJourneys[_j][_m].playerOne ||
            +this.participants[_p].id === this.matchesJourneys[_j][_m].playerTwo) {
            if (this.matchesJourneys[_j][_m].winner === +this.participants[_p].id) {
              this.score.points = this.score.points + 3;
              this.score.won = this.score.won + 1;
              this.score.played = this.score.played + 1;
            } else if (this.matchesJourneys[_j][_m].winner === 1) {
              this.score.points = this.score.points + 1;
              this.score.draw = this.score.draw + 1;
              this.score.played = this.score.played + 1;
            } else if (this.matchesJourneys[_j][_m].winner === 2
              || this.matchesJourneys[_j][_m].winner === 0) {
            } else {
              this.score.lost = this.score.lost + 1;
              this.score.played = this.score.played + 1;
            }
            found = true;
          }
        }
      }
      this.scores.push(this.score);
    }
    this.scores.sort(function (a, b) {
      return (b.points - a.points);
    });
    for (let _s = 0; _s < this.scores.length; _s++) {
      this.scores[_s].position = _s + 1;
    }
    this.SetBestParticipants();
  }

  SetBestParticipants(): void {
    for (let _m = 0; _m < this.participants.length; _m++) {
      if (this.scores[0].name === this.participants[_m].name) {
        this.Primer_Id = this.participants[_m].id.toString();
      }
      if (this.scores[1].name === this.participants[_m].name) {
        this.Segon_Id = this.participants[_m].id.toString();
      }
    }
    this.GroupIdAwards = this.competition.groupId.toString();

    if (this.modeIndividual === true) {

      this.Primer_name = 'Liga: ' + this.competition.name.toString() + ', 1er, ' + this.scores[0].name.toString();
      this.Segon_name = 'Liga: ' + this.competition.name.toString() + ', 2do, ' + this.scores[1].name.toString();

      this.groupService.getMyGroupStudents(this.GroupIdAwards).subscribe(
        ((students: Array<Student>) => {
          for (let _n = 0; _n < students.length; _n++) {
            if (this.Primer_Id === students[_n].id) {
              this.SchoolIdAwards = students[_n].schoolId.toString();
            }
          }
          this.getCollections();
        }),
        ((error: Response) => {
          this.loadingService.hide();
          this.alertService.show(error.toString());
        }));
    } else {

      this.Primer_name = 'Liga: ' + this.competition.name.toString() + ', 1er, Equipo ' + this.scores[0].name.toString();
      this.Segon_name = 'Liga: ' + this.competition.name.toString() + ', 2do, Equipo ' + this.scores[1].name.toString();

      this.groupService.getGroupTeams(this.GroupIdAwards).subscribe(
        ((teams: Array<Team>) => {
          for (let _n = 0; _n < teams.length; _n++) {
            if (this.Primer_Id === teams[_n].id) {
              this.teamService.getStudentsTeam(this.Primer_Id).subscribe(
                ((students: Array<Student>) => {
                  this.Team1 = students;
                  this.SchoolIdAwards = students[0].schoolId.toString();
                  this.getCollections();
                }),
                ((error: Response) => {
                  this.loadingService.hide();
                  this.alertService.show(error.toString());
                }));
            }
          }
          this.loadingService.hide();
        }),
        ((error: Response) => {
          this.loadingService.hide();
          this.alertService.show(error.toString());
        }));
    }

  }

  getCollections(): void {
    this.groupService.getGroupCollectionCards(this.GroupIdAwards).subscribe(
      ( (coleccion: Array<CollectionCard>) => {
        this.collections = coleccion;
        this.loadingService.hide();
      }),
      ((error: Response) => {
        this.loadingService.hide();
        this.alertService.show(error.toString());
      }));
    this.loadingService.hide();
  }

  showCards(): void {
    this.collectionService.getCollectionDetails(this.CollectionSelected.id).subscribe(
      ((collectionCards: Array<Card>) => {
        this.collectionCards = collectionCards;
        this.loadingService.hide();
      }),
      ((error: Response) => {
        this.loadingService.hide();
        this.alertService.show(error.toString());
      }));
  }

  public assignCardsToStudent(): void {
        switch (this.optionType) {
          case this.translateService.instant('CARDS.ASSIGNMENTTYPE1'):
          if (this.cardSelected && this.studentSelected) {
            this.collectionService.assignCardToStudent(this.studentSelected, this.cardSelected).subscribe(
              ((collectionCards: Array<Card>) => {
                this.loadingService.hide();
                this.alertService.show(this.translateService.instant('CARDS.CORASSIGN2'));
              }),
              ((error: Response) => {
                this.loadingService.hide();
                this.alertService.show(error.toString());
              }));
          } else { this.alertService.show(this.translateService.instant('ERROR.EMPTYFIELDS')); }
          break;
          case this.translateService.instant('CARDS.ASSIGNMENTTYPE2'):
          if (this.studentSelected) {
            var numcard = this.randomNumber(1, this.collectionCards.length - 1);
            this.snackbar.open(String(numcard) + '/' + String(this.count));
            this.collectionService.assignCardToStudent(this.studentSelected, numcard).subscribe(
              ((collectionCards: Array<Card>) => {
                this.loadingService.hide();
                this.alertService.show(this.translateService.instant('CARDS.CORASSIGN2'));
              }),
              ((error: Response) => {
                this.loadingService.hide();
                this.alertService.show(error.toString());
              }));
          } else { this.alertService.show(this.translateService.instant('ERROR.EMPTYFIELDS')); }
          break;
          case this.translateService.instant('CARDS.ASSIGNMENTTYPE3'):
          if (this.studentSelected) {
                for (let i = 0; i < 3; i++) {
                var numcard = this.randomNumber(1, this.collectionCards.length - 1);
                  this.collectionService.assignCardToStudent(this.studentSelected, numcard).subscribe(
                    ((collectionCards: Array<Card>) => {
                      this.alertService.show(this.translateService.instant('CARDS.CORASSIGN'));
                      this.loadingService.hide();
                    }),
                    ((error: Response) => {
                      this.loadingService.hide();
                      this.alertService.show(error.toString());
                    }));
                }
              } else { this.alertService.show(this.translateService.instant('ERROR.EMPTYFIELDS')); }
          break;
          case this.translateService.instant('CARDS.ASSIGNMENTTYPE4'):
          if (this.studentSelected) {
            for (let i = 0; i < 5; i++) {
              var numcard = this.randomNumber(1, this.collectionCards.length - 1);
              this.collectionService.assignCardToStudent(this.studentSelected, +numcard).subscribe(
                ((collectionCards: Array<Card>) => {
                  this.alertService.show(this.translateService.instant('CARDS.CORASSIGN'));
                  this.loadingService.hide();
                  this.count ++;
                }),
                ((error: Response) => {
                  this.loadingService.hide();
                  this.alertService.show(error.toString());
                }));
            }
          } else { this.alertService.show(this.translateService.instant('ERROR.EMPTYFIELDS')); }
          break;
        }
        this.studentSelected = "";
        this.optionType = "";
    }

  // Creación de un numero random para  asignar cromos aletorios
  public randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  SendBadge1(): void {
    if (this.scores[0].points !== 0) {
    this.badgeService.saveBadge(this.Primer_name, this.Primer_b_value, '../../../assets/img/liga-icon.svg').subscribe(
      ((newBadge: Badge) => {
        this.Primer_badge = newBadge;
        if (this.modeIndividual === true) {
          this.badgeRelationService.postBadgeRelation(this.Primer_badge.id, this.Primer_Id, this.SchoolIdAwards,
            this.GroupIdAwards, 1).subscribe(
            ((responseBadgeRelation: BadgeRelation) => {
              this.Primer_BadgeRelation = responseBadgeRelation;
              this.loadingService.hide();
              this.alertService.show(this.translateService.instant('BADGES.CORASSIGN'));
            }),
            ((error: Response) => {
              this.loadingService.hide();
              this.alertService.show(error.toString());
            }));
        } else {
          this.teamService.getStudentsTeam(this.Primer_Id).subscribe(
            ((students: Array<Student>) => {
              this.Team1 = students;
              for (let _n = 0; _n < this.Team1.length; _n++) {
                this.badgeRelationService.postBadgeRelation(this.Primer_badge.id, this.Team1[_n].id, this.SchoolIdAwards,
                  this.GroupIdAwards, 1).subscribe(
                    ((responsePointRelation: BadgeRelation) => {
                      this.Primer_BadgeRelation = responsePointRelation;
                      this.loadingService.hide();
                      this.alertService.show(this.translateService.instant('POINTS.CORASSIGN'));
                    }),
                    ((error: Response) => {
                      this.loadingService.hide();
                      this.alertService.show(error.toString());
                    }));
              }
              this.loadingService.hide();
            }),
            ((error: Response) => {
              this.loadingService.hide();
              this.alertService.show(error.toString());
            }));
        }
      }),
      ((error: Response) => {
        this.loadingService.hide();
        this.alertService.show(error.toString());
      }));
    } else { this.alertService.show(this.translateService.instant('CLASSIFICATION.NOAWARDS')); }

  }

  SendBadge2(): void {
    if (this.scores[0].points !== 0) {
      this.badgeService.saveBadge(this.Segon_name, this.Segon_b_value, '../../../assets/img/liga-icon.svg').subscribe(
        ((newBadge: Badge) => {
          this.Segon_badge = newBadge;
          if (this.modeIndividual === true) {
            this.badgeRelationService.postBadgeRelation(this.Segon_badge.id, this.Segon_Id, this.SchoolIdAwards,
              this.GroupIdAwards, 1).subscribe(
              ((responseBadgeRelation: BadgeRelation) => {
                this.Segon_BadgeRelation = responseBadgeRelation;
                this.loadingService.hide();
                this.alertService.show(this.translateService.instant('BADGES.CORASSIGN'));
              }),
              ((error: Response) => {
                this.loadingService.hide();
                this.alertService.show(error.toString());
              }));
          } else {
            this.teamService.getStudentsTeam(this.Segon_Id).subscribe(
              ((students: Array<Student>) => {
                this.Team2 = students;
                for (let _n = 0; _n < this.Team2.length; _n++) {
                  this.badgeRelationService.postBadgeRelation(this.Segon_badge.id, this.Team2[_n].id, this.SchoolIdAwards,
                    this.GroupIdAwards, 1).subscribe(
                      ((responsePointRelation: BadgeRelation) => {
                        this.Primer_BadgeRelation = responsePointRelation;
                        this.loadingService.hide();
                        this.alertService.show(this.translateService.instant('POINTS.CORASSIGN'));
                      }),
                      ((error: Response) => {
                        this.loadingService.hide();
                        this.alertService.show(error.toString());
                      }));
                }
                this.loadingService.hide();
              }),
              ((error: Response) => {
                this.loadingService.hide();
                this.alertService.show(error.toString());
              }));
          }
        }),
        ((error: Response) => {
          this.loadingService.hide();
          this.alertService.show(error.toString());
        }));
    } else { this.alertService.show(this.translateService.instant('CLASSIFICATION.NOAWARDS')); }
  }

  SendPoint1(): void {
    if (this.scores[0].points !== 0) {
      this.pointService.savePoint(this.Primer_name, this.Primer_p_value, '../../../assets/img/liga-icon.svg').subscribe(
        ((newPoint: Point) => {
          this.Primer_point = newPoint;
          this.SetPoint1();
        }),
        ((error: Response) => {
          this.loadingService.hide();
          this.alertService.show(error.toString());
        }));
    } else { this.alertService.show(this.translateService.instant('CLASSIFICATION.NOAWARDS')); }
  }

  SendPoint2(): void {
    if (this.scores[0].points !== 0) {
      this.pointService.savePoint(this.Segon_name, this.Segon_p_value, '../../../assets/img/liga-icon.svg').subscribe(
        ((newPoint: Point) => {
          this.Segon_point = newPoint;
          this.SetPoint2();
        }),
        ((error: Response) => {
          this.loadingService.hide();
          this.alertService.show(error.toString());
        }));
    } else { this.alertService.show(this.translateService.instant('CLASSIFICATION.NOAWARDS')); }
  }

  SetPoint1(): void {
    if (this.modeIndividual === true) {
      this.pointRelationService.postPointRelation(this.Primer_point.id, this.Primer_Id, this.SchoolIdAwards,
        this.GroupIdAwards, 1).subscribe(
          ((responsePointRelation: PointRelation) => {
            this.Primer_PointRelation = responsePointRelation;
            this.loadingService.hide();
            this.alertService.show(this.translateService.instant('POINTS.CORASSIGN'));
          }),
          ((error: Response) => {
            this.loadingService.hide();
            this.alertService.show(error.toString());
          }));
    } else {
      this.teamService.getStudentsTeam(this.Primer_Id).subscribe(
        ((students: Array<Student>) => {
          this.Team1 = students;
          for (let _n = 0; _n < this.Team1.length; _n++) {
            this.pointRelationService.postPointRelation(this.Primer_point.id, this.Team1[_n].id, this.SchoolIdAwards,
              this.GroupIdAwards, 1).subscribe(
                ((responsePointRelation: PointRelation) => {
                  this.Primer_PointRelation = responsePointRelation;
                  this.loadingService.hide();
                  this.alertService.show(this.translateService.instant('POINTS.CORASSIGN'));
                }),
                ((error: Response) => {
                  this.loadingService.hide();
                  this.alertService.show(error.toString());
                }));
          }
          this.loadingService.hide();
        }),
        ((error: Response) => {
          this.loadingService.hide();
          this.alertService.show(error.toString());
        }));
    }

  }

  SetPoint2(): void {
    if (this.modeIndividual === true) {
      this.pointRelationService.postPointRelation(this.Segon_point.id, this.Segon_Id, this.SchoolIdAwards,
        this.GroupIdAwards, 1).subscribe(
          ((responsePointRelation: PointRelation) => {
            this.Segon_PointRelation = responsePointRelation;
            this.loadingService.hide();
            this.alertService.show(this.translateService.instant('POINTS.CORASSIGN'));
          }),
          ((error: Response) => {
            this.loadingService.hide();
            this.alertService.show(error.toString());
          }));
    } else {
      this.teamService.getStudentsTeam(this.Segon_Id).subscribe(
        ((students: Array<Student>) => {
          this.Team2 = students;
          for (let _n = 0; _n < this.Team2.length; _n++) {
            this.pointRelationService.postPointRelation(this.Segon_point.id, this.Team2[_n].id, this.SchoolIdAwards,
              this.GroupIdAwards, 1).subscribe(
                ((responsePointRelation: PointRelation) => {
                  this.Segon_PointRelation = responsePointRelation;
                  this.loadingService.hide();
                  this.alertService.show(this.translateService.instant('POINTS.CORASSIGN'));
                }),
                ((error: Response) => {
                  this.loadingService.hide();
                  this.alertService.show(error.toString());
                }));
          }
          this.loadingService.hide();
        }),
        ((error: Response) => {
          this.loadingService.hide();
          this.alertService.show(error.toString());
        }));
    }

  }


}

export interface Score {
  position: number;
  name: string;
  played: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
}

export interface Participant {
  id: number;
  name: string;
}
