from github import Github
import json
import os
import sys
from datetime import datetime

def fetch_github_data():
    try:
        # Inicializar cliente de GitHub
        github_token = os.environ.get('GITHUB_TOKEN')
        if not github_token:
            print("Error: GITHUB_TOKEN no está definido en las variables de entorno.")
            sys.exit(1)
        
        g = Github(github_token)
        
        # Obtener el repositorio actual
        repo_name = os.environ.get('GITHUB_REPOSITORY')
        if not repo_name:
            print("Error: GITHUB_REPOSITORY no está definido en las variables de entorno.")
            sys.exit(1)
        
        print(f"Obteniendo datos del repositorio: {repo_name}")
        repo = g.get_repo(repo_name)
        
        # Obtener issues
        print("Obteniendo issues...")
        issues_data = []
        for issue in repo.get_issues(state='all'):
            # Omitir pull requests
            if issue.pull_request:
                continue
                
            issue_data = {
                'number': issue.number,
                'title': issue.title,
                'state': issue.state,
                'created_at': issue.created_at.isoformat(),
                'closed_at': issue.closed_at.isoformat() if issue.closed_at else None,
                'labels': [label.name for label in issue.labels],
                'body': issue.body or '',
                'url': issue.html_url,
                'assignees': [assignee.login for assignee in issue.assignees],
                'comments': issue.comments
            }
            
            # Obtener información del milestone
            if issue.milestone:
                issue_data['milestone'] = {
                    'title': issue.milestone.title,
                    'number': issue.milestone.number,
                    'state': issue.milestone.state,
                    'url': issue.milestone.html_url
                }
            else:
                issue_data['milestone'] = None
                
            issues_data.append(issue_data)
        
        print(f"Se encontraron {len(issues_data)} issues.")
        
        # Obtener milestones
        print("Obteniendo milestones...")
        milestones_data = []
        for milestone in repo.get_milestones(state='all'):
            milestone_data = {
                'number': milestone.number,
                'title': milestone.title,
                'description': milestone.description or '',
                'state': milestone.state,
                'created_at': milestone.created_at.isoformat() if milestone.created_at else None,
                'due_on': milestone.due_on.isoformat() if milestone.due_on else None,
                'url': milestone.html_url,
                'open_issues': milestone.open_issues,
                'closed_issues': milestone.closed_issues,
                'progress': milestone.closed_issues / (milestone.open_issues + milestone.closed_issues) * 100 if (milestone.open_issues + milestone.closed_issues) > 0 else 0
            }
            milestones_data.append(milestone_data)
        
        print(f"Se encontraron {len(milestones_data)} milestones.")
        
        # Guardar datos
        os.makedirs('data', exist_ok=True)
        
        print("Guardando datos en data/issues.json...")
        with open('data/issues.json', 'w') as f:
            json.dump(issues_data, f, indent=2)
            
        print("Guardando datos en data/milestones.json...")
        with open('data/milestones.json', 'w') as f:
            json.dump(milestones_data, f, indent=2)
            
        # Guardar metadata
        metadata = {
            'last_updated': datetime.now().isoformat(),
            'repository': repo_name,
            'issues_count': len(issues_data),
            'milestones_count': len(milestones_data)
        }
        
        print("Guardando metadata en data/metadata.json...")
        with open('data/metadata.json', 'w') as f:
            json.dump(metadata, f, indent=2)
            
        print("Datos de GitHub obtenidos y guardados correctamente.")
        
    except Exception as e:
        print(f"Error al obtener datos de GitHub: {str(e)}")
        sys.exit(1)

if __name__ == '__main__':
    fetch_github_data() 