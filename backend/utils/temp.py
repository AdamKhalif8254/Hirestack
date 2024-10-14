import sys
from database import Database

def main():
    # Initialize the Database
    db = Database(table_name='Hirestack', region='ca-central-1', create_new=False)
    
    # Fit the search index (this should be done once after loading data)
    print("Fitting search index... This may take a moment.")
    db.fit_search_index()
    print("Search index fitted.")

    while True:
        # Prompt for search query
        query = input("Enter your job search query (or 'quit' to exit): ").strip()
        if query.lower() == 'quit':
            print("Thank you for using the job search. Goodbye!")
            sys.exit(0)

        # Prompt for optional filters
        province = input("Enter province (optional, press Enter to skip): ").strip() or None
        city = input("Enter city (optional, press Enter to skip): ").strip() or None

        # Perform the search
        try:
            results = db.search_jobs(query, province=province, city=city, num_results=5)
            
            if not results:
                print("No results found.")
            else:
                print(f"\nFound {len(results)} results:")
                for i, job in enumerate(results, 1):
                    print(f"\n--- Result {i} ---")
                    print(f"Title: {job.get('title', 'N/A')}")
                    print(f"Company: {job.get('company', 'N/A')}")
                    print(f"Location: {job.get('city', 'N/A')}, {job.get('province', 'N/A')}")
                    print(f"Description snippet: {job.get('description', 'N/A')[:100]}...")
            
            print("\n" + "-"*40 + "\n")
        
        except Exception as e:
            print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()