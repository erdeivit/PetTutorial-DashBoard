import { environment } from '../environments/environment';

export class AppConfig {

  // Server connection
  public static get SERVER_URL(): string { return environment.api; }
  public static get PET_URL(): string { return '/pet'; }
  public static get TEACHER_URL(): string { return this.SERVER_URL + '/api/teachers'; }
  public static get STUDENT_URL(): string { return this.SERVER_URL + '/api/students'; }
  public static get SCHOOLADMIN_URL(): string { return this.SERVER_URL + '/api/schooladministrators'; }
  public static get SCHOOL_URL(): string { return this.SERVER_URL + '/api/schools'; }
  public static get AVATARS_URL(): string { return this.SERVER_URL + '/api/avatars'; }
  public static get MATTERS_URL(): string { return this.SERVER_URL + '/api/matters'; }
  public static get GRADES_URL(): string { return this.SERVER_URL + '/api/grades'; }
  public static get GROUP_URL(): string { return this.SERVER_URL + '/api/groups'; }

  // QUESTIONNAIRES URL
  public static get QUESTIONNAIRE_URL(): string { return this.SERVER_URL + '/api/Questionnaires'; }
  public static get QUESTION_URL(): string { return this.SERVER_URL + '/api/Questions'; }
  public static get QUESTIONNAIREGAME_URL(): string { return this.SERVER_URL + '/api/QuestionnaireGames'; }
  public static get RESULTQUESTIONNAIRE_URL(): string { return this.SERVER_URL + '/api/ResultQuestionnaires'; }

  public static get POINT_URL(): string { return this.SERVER_URL + '/api/points'; }
  public static get BADGE_URL(): string { return this.SERVER_URL + '/api/badges'; }
  public static get RANGE_URL(): string { return this.SERVER_URL + '/api/ranges'; }
  public static get POINTRELATION_URL(): string { return this.SERVER_URL + '/api/pointRelations'; }
  public static get BADGERELATION_URL(): string { return this.SERVER_URL + '/api/badgeRelations'; }
  public static get COLLECTION_URL(): string { return this.SERVER_URL + '/api/collectionCards'; }
  public static get CARD_URL(): string { return this.SERVER_URL + '/api/cards'; }
  public static get COMPETITION_URL(): string { return this.SERVER_URL + '/api/competitions'; }
  public static get JOURNEY_URL(): string { return this.SERVER_URL + '/api/journeys'; }
  public static get MATCH_URL(): string { return this.SERVER_URL + '/api/matches'; }
  public static get TEAM_URL(): string { return this.SERVER_URL + '/api/teams'; }

  // Segunda parte de la url
  public static get ONLY_REWARDS_URL(): string { return this.SERVER_URL + '/api/rewards'; }
  public static get NEW_MATTER(): string { return this.SERVER_URL + '/api/matters/replaceOrCreate'; }

  public static get LOGIN_URL(): string { return '/login'; }
  public static get LOGOUT_URL(): string { return '/logout'; }
  public static get MYSCHOOL_URL(): string { return '/school'; }
  public static get TEACHERS_URL(): string { return '/teachers'; }
  public static get STUDENTS_URL(): string { return '/students'; }
  public static get COUNT_URL(): string { return '/count'; }
  public static get GROUPS_URL(): string { return '/groups'; }
  public static get ASSISTANCE_URL(): string { return '/assistance'; }

  // QUESTIONNAIRES URL
  public static get QUESTIONNAIRES_URL(): string { return '/questionnaire'; }
  public static get QUESTIONS_URL(): string { return '/question'; }
  public static get QUESTIONNAIRESGAME_URL(): string { return '/QuestionnairesGame'; }
  public static get QUESGAME_URL(): string { return '/questionnaireGame'; }

  public static get POINTS_URL(): string { return '/points'; }
  public static get BADGES_URL(): string { return '/badges'; }
  public static get POINTSRELATION_URL(): string { return '/pointRelations'; }
  public static get BADGESRELATION_URL(): string { return '/badgeRelations'; }
  public static get COLLECTIONS_URL(): string { return '/collectionCards'; }
  public static get CARDS_URL(): string { return '/cards'; }
  public static get COMPETITIONS_URL(): string { return '/competitions'; }
  public static get JOURNEYS_URL(): string { return '/journeys'; }
  public static get MATCHES_URL(): string { return '/matches'; }
  public static get TEAMS_URL(): string { return '/teams'; }
  public static get REL_URL(): string { return '/rel'; }
  public static get REWARDS_URL(): string { return '/rewards'; }
  public static get EXISTS_URL(): string { return '/exists'; }

  public static get AUTH_HEADER(): string { return 'Authorization'; }

  // Errors
  public static get LOGIN_FAILED(): string { return 'LOGIN_FAILED'; }
  public static get LOGIN_FAILED_EMAIL_NOT_VERIFIED(): string { return 'LOGIN_FAILED_EMAIL_NOT_VERIFIED'; }

  // Localstorage
  public static get LS_USER(): string { return 'currentUser'; }
  public static get LS_ROLE(): string { return 'currentRole'; }

  // i18n configuration
  public static get LANG(): string { return 'ca'; }
  public static get LANG_PATH(): string { return '/assets/i18n'; }
  public static get LANG_EXT(): string { return '.json'; }
}
